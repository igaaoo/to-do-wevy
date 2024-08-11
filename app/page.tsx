"use client";
import { columns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/Datatable";
import { CreateTaskCard } from "@/components/task/CreateTask";
import { useAuthContext } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const { token } = useAuthContext();
  const { data, updateData } = useDataContext();

  useEffect(() => {
    if (token)
      updateData();
  }, [token]);

  return (
    <div className="flex w-full flex-col items-center justify-center  pt-2 md:mt-12 md:px-10 xl:px-32">
      <section className="flex min-w-[70%] flex-col-reverse justify-start gap-4 md:grid md:grid-cols-5">
        <CreateTaskCard />

        <div className="col-span-3">
          <DataTable
            columns={columns}
            data={data}
          />
        </div>
      </section>
    </div>
  );
}




