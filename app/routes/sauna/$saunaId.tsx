import { format } from "date-fns";
import { useRef } from "react";
import { json, Link, LoaderFunction, Outlet, redirect, useLoaderData, useOutletContext, useParams } from "remix";
import invariant from "tiny-invariant";
import { api, Sauna } from "~/models/sauna";
import { useLayoutEffect } from "~/utils/useLayoutEffect";
import { Slot } from "~/models/slot";

type LoaderData = {
  sauna: Sauna;
};

type ContextType = {
  sauna: Sauna,
  slot: Slot,
};

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.saunaId, 'Expecting sauna id');

  if (! params.date) {
    const path = new URL(request.url).pathname.replace(/\/$/, '');

    const today = format(new Date(), 'yyyy-MM-dd');
    return redirect(`${path}/${today}`);
  }

  const sauna = await api.sauna(params.saunaId);

  return json<LoaderData>({
    sauna,
  });
}
export default function Sauna() {
  const { sauna } = useLoaderData<LoaderData>();

  return <Outlet context={sauna} />
}
