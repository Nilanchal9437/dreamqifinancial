"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Eye } from "lucide-react"; // Lucide-React Icons
import moment from "moment";

import CustomPagination from "@/components/Pagination";
import Title from "@/components/Title";
import Modal from "@/components/Modal";

import type { ChatType } from "@/features/admin/chat/types";
import getList from "@/features/admin/chat/apis/getList";

function Chat() {
  const [load, setLoad] = useState<boolean>(true);
  const [store, setStore] = useState<{ store: ChatType[]; total: number }>({
    store: [],
    total: 0,
  });
  const [pagination, setPagination] = useState<{
    limit: number;
    pageNo: number;
  }>({
    limit: 10,
    pageNo: 1,
  });

  const [user, setUser] = React.useState<{
    answer: { [key: string | number]: string | number }[];
    open: boolean;
  }>({ answer: [], open: false });

  const getChatList = async (): Promise<void> => {
    setLoad(true);

    const { status, data, total } = await getList({ ...pagination });

    if (status) {
      setStore({ store: data, total: total });
    } else {
      setStore({ store: [], total: 0 });
    }
    setLoad(false);
  };

  useEffect(() => {
    getChatList();
  }, [JSON.stringify(pagination)]);

  return (
    <div className="container mx-auto px-4">
      {/* Header Title */}
      <Title
        title="User Chat List"
        description="These are the financial chatlist for users"
        btntitle=""
        hidebtn
        action={() => {}}
      />

      {/* Table Container */}
      <div className="overflow-x-auto shadow-md rounded-lg mt-4">
        <table className="min-w-full bg-gray-900">
          {/* Table Header */}
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-start">Date</th>
              <th className="px-4 py-3 text-start">Reference ID</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-gray-600 text-gray-300">
            {load ? (
              // Loading Skeleton Rows
              [...Array(10)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3 animate-pulse bg-gray-200 h-10"></td>
                  <td className="px-4 py-3 animate-pulse bg-gray-200 h-10"></td>
                  <td className="px-4 py-3 animate-pulse bg-gray-200 h-10"></td>
                </tr>
              ))
            ) : store?.store.length === 0 ? (
              // No Data Found
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center">
                  <Image
                    src="/no-data-found.png"
                    alt="not found"
                    height={400}
                    width={400}
                    className="mx-auto object-cover"
                  />
                </td>
              </tr>
            ) : (
              // Data Rows
              store?.store?.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3 text-start">
                    {moment(row.created_at).format("MMMM Do YYYY, h:mm a")}
                  </td>
                  <td className="px-4 py-3 text-start">{row._id}</td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() =>
                        setUser({ answer: [...row.answer], open: true })
                      }
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex justify-end">
        <CustomPagination
          limit={pagination.limit}
          startingAfter={pagination.pageNo}
          total={store.total}
          onChange={(page) => setPagination({ ...pagination, pageNo: page })}
        />
      </div>
      {user.open ? (
        <Modal
          title="USER RESPONSES"
          maxWidth="40vw"
          content={
            <>
              <div className="overflow-x-auto shadow-md rounded-lg mt-4">
                <table className="min-w-full bg-gray-900">
                  {/* Table Header */}
                  <thead className="bg-gray-900 text-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-start">Question</th>
                      <th className="px-4 py-3 text-start">Answer</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="bg-gray-600 text-gray-300">
                    {user.answer.length === 0 ? ( 
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center">
                          <Image
                            src="/no-data-found.png"
                            alt="not found"
                            height={400}
                            width={400}
                            className="mx-auto object-cover"
                          />
                        </td>
                      </tr>
                    ) : (
                      user.answer?.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3 text-start">
                            {row.question}
                          </td>
                          <td className="px-4 py-3 text-start">{row.answer}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          }
          secondaryText="This is chat response of the perticular user"
          onClose={() => setUser({ open: false, answer: [] })}
          open={user.open}
        />
      ) : null}
    </div>
  );
}

export default Chat;
