import { ActionFunction, Form, useActionData, useTransition } from "remix";
import { api } from "~/models/sauna";
import { useSauna } from "../../$date";

export const action: ActionFunction = async ({
    request,
}) => {
    const formData = await request.formData();
    const { phone, sauna, sku } = Object.fromEntries(formData);

    const res = await api.reserve({
        phone: phone.toString(),
        sauna: sauna.toString(),
        sku: sku.toString(),
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
        <div className="flex items-center p-4 bg-slate-100">
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
                    <div className="space-y-4">
                        <div>
                            Access code: <span className="inline-block px-2 py-1 text-xl font-bold tracking-wider rounded bg-slate-200">{actionData?.code}</span>
                        </div>
                        <small className="block leading-none rounde">Code is the last four digits of inserted phone number 😎</small>
                    </div>
                :
                <Form method="post">
                    <div className="grid gap-2">
                        <div>
                            <label htmlFor="phone" className="text-sm text-slate-600">Phone</label>
                            <input id="phone" type="text" name="phone" className="block w-full p-2 border rounded border-slate-400 " />
                            <input id="sauna" type="hidden" name="sauna" value={sauna.id} />
                            <input id="sku" type="hidden" name="sku" value={slot.sku} />
                        </div>
                        <button
                            disabled={state === 'sending'}
                            className="block w-full p-4 text-white transition rounded bg-sky-800 hover:bg-sky-700 hover:shadow-lg disabled:opacity-20"
                        >
                            Reserve
                        </button>
                    </div>
                </Form>
                }
                </div>
            </div>
        </div>
    )
}