import { component$, createContextId, useContext, useContextProvider } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { chat } from "~/api/chat";

enum MessageType {
    client,
    bot
}

interface Message {
    type: MessageType;
    content: string;
}

const messageContext = createContextId<Message[]>('MessageContext');

interface MessageProps {
    index: number;
}

const MessageComp = component$<MessageProps>((props) => {
    const message = useContext(messageContext, (value) => value[props.index]);

    return <div class={"bg-slate-800 rounded-lg max-w-[66.6%] box-border p-1 mb-2" + (message.type === MessageType.bot ? ' mr-auto' : ' ml-auto')}>
        { message.content }
    </div>;
});

const prompt = server$(async (msgs: Message[]) => {
    return chat('wad', msgs.map(msg => msg.content));
});

export default component$(() => {
    useContextProvider(messageContext, [
        { type: MessageType.client, content: 'Think of a good way to pull tons of chicks, please.' },
        { type: MessageType.bot, content: 'Just walk up to em, duh.' }
    ]);

    const messages = useContext(messageContext);

    return (<div class="w-1/2 box-border mx-auto min-h-full bg-white mt-8 rounded-lg border-solid drop-shadow-xl p-1">
        <h1 class="text-lg font-bold">ChatGPT</h1>
        <div class="w-full box-border h-full min-h-full bg-slate-900 rounded-lg border-solid text-slate-200 p-2">
            { messages.map((v, i) => <MessageComp key={i} index={i} />) }
            <textarea class="resize-none w-full rounded-lg bg-slate-800 p-1" placeholder="Start chattin'"onKeyUp$={(event) => {
                if (event.key == 'Enter') {
                    prompt(messages).then(v => console.log(v));
                }
            }}>

            </textarea>
        </div>
    </div>);
});