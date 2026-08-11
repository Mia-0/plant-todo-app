import { useState } from 'react';
import { RECOMMENDED_BOOKS, type Book } from '../data/books';
import { Search, BookOpen } from 'lucide-react';

interface BookPickerProps {
  onSelect: (book: Book) => void;
}

export default function BookPicker({ onSelect }: BookPickerProps) {
  const [search, setSearch] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customAuthor, setCustomAuthor] = useState('');

  const filtered = RECOMMENDED_BOOKS.filter(
    b => b.title.includes(search) || b.author.includes(search) || b.category.includes(search)
  );

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜索书名、作者..."
          className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-leaf-400"
        />
      </div>

      {/* Book list */}
      <div className="max-h-48 overflow-y-auto space-y-1">
        {filtered.map((book, i) => (
          <button
            key={i}
            onClick={() => onSelect(book)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-leaf-50 active:scale-[0.98] transition-all text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <BookOpen size={14} className="text-blue-500" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{book.title}</div>
              <div className="text-xs text-gray-400">{book.author} · {book.category}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Custom book */}
      <div className="border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-400 mb-2">没找到？自定义书名：</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customTitle}
            onChange={e => setCustomTitle(e.target.value)}
            placeholder="书名"
            className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-leaf-400"
          />
          <input
            type="text"
            value={customAuthor}
            onChange={e => setCustomAuthor(e.target.value)}
            placeholder="作者"
            className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-leaf-400"
          />
          <button
            onClick={() => customTitle && onSelect({ title: customTitle, author: customAuthor || '未知', category: '自定义', reason: '' })}
            disabled={!customTitle}
            className="px-3 py-1.5 rounded-lg bg-leaf-500 text-white text-xs font-medium disabled:opacity-40"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}
