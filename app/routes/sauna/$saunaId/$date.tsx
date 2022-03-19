import { format } from "date-fns";
import { useRef } from "react";
import { json, Link, LoaderFunction, Outlet, useLoaderData, useOutletContext, useParams } from "remix";
import invariant from "tiny-invariant";
import { api, Sauna } from "~/models/sauna";
import { useLayoutEffect } from "~/utils/useLayoutEffect";
import { Slot } from "~/models/slot";

type LoaderData = {
  sauna: Sauna,
  slots: Slot[]
};

type ContextType = {
  sauna: Sauna,
  slot: Slot,
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.saunaId, 'Expecting sauna id');
  invariant(params.date, 'Expecting date');

  const date = params.date;

  const saunaId = params.saunaId;

  const sauna = await api.sauna(saunaId);
  const slots = await api.slots(saunaId, date);

  return json<LoaderData>({
    sauna,
    slots,
  });
}

export default function SaunaDate() {
  const { sauna, slots } = useLoaderData<LoaderData>();
  let { slug, slot } = useParams();

  const pos = useRef<number>();

  useLayoutEffect(() => {
    if (pos.current) {
      requestAnimationFrame(() => void window.scrollTo({top: pos.current }));
    }

    return () => void (pos.current = window.scrollY);
  }, [slug])


  const today = format(new Date(), 'E dd.MM.yyyy');

  const formattedSlots = slots.map((item: Slot) => {
    const from = new Date(item.from);
    const to = new Date(item.to);
    return {
      ...item,
      date: format(from, 'dd.MM.'),
      from: format(from, 'HH:mm'),
      to: format(to, 'HH:mm'),
    }
  });

  return (
      <div className="grid gap-4">
        <div className="relative grid gap-4">
          <div className="sticky top-0 z-10 p-4 font-bold shadow-lg">
            {today}
          </div>
          <div className="grid gap-4">
            {! formattedSlots.length
            ? <div>Ei aikoja</div>
            : formattedSlots.map((item) => {
              return slug == item.id
              ? <div className={`relative`} key={item.id}>
                    <div className="grid p-4 rounded-t bg-sky-600">
                      <div className={`font-bold text-white flex justify-between`}>
                        <div>
                          {item.from}
                        </div>
                        <div>
                          {item.date}
                        </div>
                      </div>
                    </div>
                    <div className="border-2 rounded-b border-sky-600">
                      <Outlet context={{sauna, slot: item}} />
                    </div>
                  </div>
              : item.stock
              ? <div className={`relative p-4 rounded transition  ${slug == item.id ? 'bg-slate-500 text-slate-100' : 'bg-slate-100 hover:bg-slate-200'}`} key={item.id}>
                    <div className="grid">
                      <div className={`font-bold ${slug == item.id ? 'text-white' : 'text-slate-800'}`}>
                        <Link to={`slot/${item.id}`} className="stretched">
                        {item.from}
                        </Link>
                      </div>
                      <div className={`text-sm ${slug == item.id ? 'text-white' : 'text-slate-600'}`}>
                        Vapaa
                      </div>
                    </div>
                  </div>
                : <div className={`relative p-4 rounded bg-red-200`} key={item.id}>
                    <div className="grid">
                      <div className={`font-bold text-white`}>
                        {item.from}
                      </div>
                    </div>
                  </div>
            })}
          </div>
        </div>
      </div>
  );
}

export function useSauna() {
  return useOutletContext<ContextType>();
}

export function ErrorBoundary({ error }: {error: any}) {
  console.error(error)
  return (
    <div className="p-4 text-white bg-red-300 rounded">Error</div>
  );
}