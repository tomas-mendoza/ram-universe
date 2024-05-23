import { ChevronRight, ChevronLeft } from "lucide-react";

type PaginationProps = {
  updatePage: (quantity: number, operator: string) => void;
  page: number;
}

export default function Pagination({ updatePage, page }: PaginationProps) {


  return (
    <div className="w-screen flex justify-center gap-3 p-3">
      <button className="bg-green-500 p-3 rounded flex justify-center items-center" onClick={() => updatePage(1, '-')}>
        <ChevronLeft />
      </button>
      <p className="bg-white p-2 rounded w-8 flex justify-center items-center">{ page }</p>
      <button className="bg-green-500 p-3 rounded flex justify-center items-center" onClick={() => updatePage(1, '+')}>
        <ChevronRight />
      </button>
    </div>
  )
}