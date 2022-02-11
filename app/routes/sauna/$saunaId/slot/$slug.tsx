import { ActionFunction, Form, useActionData, useTransition } from "remix";
import { orderSlot } from "~/models/slot";
import { useSauna } from "../../$saunaId";

export const action: ActionFunction = async ({
    request,
}) => {
    const formData = await request.formData();
    const { phone, slot } = Object.fromEntries(formData);

    const res = await orderSlot(parseInt(slot.toString()), {
        phone: phone.toString(),
    });

    return {
        code: res.code,
    };
};


export default function Slot() {
    const actionData = useActionData();
    const transition = useTransition();
    const { sauna, slot } = useSauna();

    let state: 'idle' | 'sending' | 'error' | 'sent' =
        transition.state === "submitting"
        ? 'sending'
        : 'idle';

    if (actionData?.code) {
        state = 'sent';
    }

    return (
        <div className="flex items-center h-[80%]">
            <div className="flex-1">
                <div className="grid gap-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="font-bold text-slate-800">
                        {sauna?.name}
                    </div>
                    <div className="h-[2px] rounded bg-slate-300 grow mt-[3px]"></div>
                    <div className="text-slate-700">
                        {slot.from} - {slot.to}
                    </div>
                </div>
                {state === 'sent'
                ?
                    <div className="space-y-2">
                        <div>
                            Koodisi: <strong>{actionData?.code}</strong>
                        </div>
                        <small className="block leading-none">Koodi on puhelinnumerosi neljä viimeistä numeroa 😎</small>
                    </div>
                :
                <Form method="post">
                    <div className="grid gap-2">
                        <div>
                            <label htmlFor="phone" className="text-sm text-slate-600">Puhelin</label>
                            <input id="phone" type="text" name="phone" className="block w-full p-2 border rounded border-slate-400" />
                            <input id="slot" type="hidden" name="slot" value={slot.id} />
                        </div>
                        <button
                            disabled={state === 'sending'}
                            className="block w-full p-4 text-white transition rounded bg-sky-700 hover:bg-sky-500 disabled:opacity-20"
                        >
                            Varaa
                        </button>
                    </div>
                </Form>
                }
                </div>
            </div>
        </div>
    )
}