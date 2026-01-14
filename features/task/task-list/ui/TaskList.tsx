"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVirtualizer } from "@tanstack/react-virtual";
import Modal from "@/shared/ui/Modal";
import { useTaskInfiniteQuery } from "@/entities/task/api/useTaskInfiniteQuery";

export default function TaskList() {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasShownErrorModalRef = useRef(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useTaskInfiniteQuery();

  const items = data?.pages.flat() ?? [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? items.length + 1 : items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  });

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!hasNextPage && items.length > 0 && !hasShownErrorModalRef.current) {
      setErrorMessage("잘못된 요청입니다.");
      setShowErrorModal(true);
      hasShownErrorModalRef.current = true;
    }
  }, [hasNextPage, items.length]);

  if (isError) {
    return <p>에러가 발생했습니다.</p>;
  }

  return (
    <>
      {/* 리스트 */}
      <div ref={parentRef} className="h-[600px] overflow-auto rounded border">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const task = items[virtualRow.index];

            if (!task) {
              return null;
            }

            return (
              <div
                key={virtualRow.key}
                onClick={() => router.push(`/task/${task.id}`)}
                className="cursor-pointer border-b px-4 py-2 hover:bg-gray-50"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.memo}</p>
              </div>
            );
          })}
        </div>

        {/* 하단 로딩 UI */}
        {isFetchingNextPage && (
          <div className="py-4 text-center text-sm text-gray-500">
            로딩 중...
          </div>
        )}
      </div>

      {/* 400 에러 모달 */}
      <Modal
        isOpen={showErrorModal}
        title="알림"
        onClose={() => setShowErrorModal(false)}
      >
        <p className="mb-4 text-sm">{errorMessage}</p>
        <button
          className="w-full rounded bg-primary px-3 py-2 text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          목록으로 이동
        </button>
      </Modal>
    </>
  );
}
