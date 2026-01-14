"use client";

import { notFound, useRouter, useParams } from "next/navigation";
import { useState } from "react";

import Modal from "@/shared/ui/Modal";
import { useTaskDetailQuery } from "@/entities/task/api/useTaskDetailQuery";
import { useDeleteTaskMutation } from "@/entities/task/api/useDeleteTaskMutation";

export default function TaskDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useTaskDetailQuery(id);
  const deleteMutation = useDeleteTaskMutation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  /* ---------- 에러 처리 ---------- */
  if (isError) {
    const status = (error as any)?.response?.status;

    if (status === 401) {
      router.replace(`/sign-in?redirect=/task/${id}`);
      return null;
    }

    if (status === 404) {
      notFound();
    }

    return <p>에러가 발생했습니다.</p>;
  }

  if (isLoading || !data) {
    return <p>로딩 중...</p>;
  }

  /* ---------- 삭제 ---------- */
  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    router.push("/task");
  };

  const isConfirmMatched = confirmValue === id;

  return (
    <>
      <section className="space-y-4">
        <h1 className="text-xl font-semibold">{data.title}</h1>

        <p className="text-gray-700">{data.memo}</p>

        <p className="text-sm text-gray-500">등록일: {data.registerDatetime}</p>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="rounded bg-red-500 px-4 py-2 text-white cursor-pointer"
        >
          삭제
        </button>
      </section>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={showDeleteModal}
        title="삭제 확인"
        onClose={() => setShowDeleteModal(false)}
      >
        <p className="mb-2 text-sm">
          삭제하려면 아래에 <b>{id}</b>를 입력하세요.
        </p>

        <input
          value={confirmValue}
          onChange={(e) => setConfirmValue(e.target.value)}
          className="mb-4 w-full rounded border px-2 py-1 text-sm"
          placeholder="ID 입력"
        />

        <button
          disabled={!isConfirmMatched}
          onClick={handleDelete}
          className={`w-full rounded px-3 py-2 text-white ${
            isConfirmMatched ? "bg-red-500" : "bg-gray-300"
          } cursor-pointer`}
        >
          삭제
        </button>
      </Modal>
    </>
  );
}
