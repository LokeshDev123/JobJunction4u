'use client';

import DashboardNavbar from '@/Components/DashboardNavbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ContentBlock = { headline?: string; content?: string };
type BlogItem = {
  _id: string;
  title: string;
  author: string;
  content: ContentBlock[];
  image: string;
  date: string;
  active?: boolean; // <-- used for toggle
};

export default function Page() {
  // state
  const [items, setItems] = useState<BlogItem[]>([]);
  const [busy, setBusy] = useState<Record<string, boolean>>({}); // per-row lock

  const router=useRouter()
  // load
  const fetchData = async (): Promise<void> => {

    const res = await fetch(`/api/admin/blog/readallblogs`, {
      next: { revalidate: 0 },
      cache: 'no-cache',
      method: 'POST',
    });

    
    const data = await res.json();
    const iterateData: BlogItem[] = data?.data ?? [];
    setItems(iterateData);
  };

  useEffect(() => {

    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);


  useEffect(()=>{
if(!sessionStorage.getItem("adminToken")){router.push("/dashboard/signin")}
    
  },[])
  // utils
  const formatDate = (raw?: string) => {
    if (!raw) return '';
    const safe = raw.replace(' ', 'T');
    const dt = new Date(safe);
    if (Number.isNaN(dt.getTime())) return '';
    return dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // optimistic toggle
  const handleToggleActive = async (row: BlogItem) => {
   

    try {
      const res = await (await fetch(`/api/admin/blog/deleteblog?token=${sessionStorage.getItem("adminToken")}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
        body: JSON.stringify({ id: row._id, flag:!row.active }),
      })).json();

      
      
 
      
      if(res.success){
        fetchData()
        window.alert(res.message)
      }
      else{
        window.alert(res.message)
      }

      
      
    } catch (e) {
      // rollback
      alert('Something went wrong. Please try again.');
    } 
  };

  // optimistic delete
  const handleDelete = async (row: BlogItem) => {
 
    try {
      const res = await (await fetch(`/api/admin/blog/deleteblog?token=${sessionStorage.getItem("adminToken")}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
        body: JSON.stringify({ _id: row._id }),
      })).json();

      
 
      
      if(res.success){
        fetchData()
        window.alert(res.message)
      }
      else{
        window.alert(res.message)
      }

      
      
    } catch (e) {
      // rollback
      alert('Something went wrong. Please try again.');
    } 
  };

  return (
    <>
    <DashboardNavbar/>
    <section className="bg-[#f7f5f4] py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
            Fresh reads from our team and community.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-16 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => {
              const title = post?.title ?? 'Untitled';
              const author = post?.author ?? 'Unknown';
              const img = post?.image ?? '';
              const dateLabel = formatDate(post?.date);
              const isBusy = !!busy[post._id];
              const isActive = Boolean(post.active);
              
              return (
                  <article
                  key={post._id}
                  className="flex h-full flex-col rounded-2xl bg-white p-4 shadow dark:bg-gray-800"
                  >
                {/* Media */}
                <div className="relative w-full">
                  <img
                    src={img || 'https://placehold.co/1600x900?text=No+Image'}
                    alt={title}
                    className="aspect-video w-full rounded-xl object-cover"
                    loading="lazy"
                    />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10" />
                  {/* Active badge */}
                  <div
                    className={`absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-medium ${
                        isActive
                        ? 'bg-green-100 text-green-700 ring-1 ring-green-300'
                        : 'bg-gray-100 text-gray-700 ring-1 ring-gray-300'
                        }`}
                        >
                    {isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                {/* Body */}
                <div className="flex grow flex-col">
                  <div className="mt-4 flex items-center gap-x-4 text-xs text-gray-500 dark:text-gray-400">
                    {dateLabel && <time>{dateLabel}</time>}
                  </div>

                  <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 dark:text-white line-clamp-2">
                    <Link href={`/blog/${post._id}`} className="hover:underline">
                      {title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">{author}</p>

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-2">
                   

                    <button
                      type="button"
                      onClick={() => handleDelete(post)}
                      disabled={isBusy}
                      className="inline-flex items-center justify-center rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-red-700 ring-1 ring-red-300 hover:bg-red-50 transition disabled:opacity-60"
                      aria-label="Delete blog"
                      title="Delete"
                      >
                      {isBusy ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </article>
            );
        })}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
            <div className="mt-12 rounded-xl border border-dashed border-orange-300/70 bg-white/70 p-6 text-center dark:bg-gray-900/50">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              No blogs yet. Add one from your dashboard.
            </p>
          </div>
        )}
      </div>
    </section>
        </>
  );
}
