import { MessageBus } from '@podium/browser';

const publish =  (channel: string, topic: string, payload?: unknown) => {
    const messageBus = new MessageBus();
    messageBus.publish(channel, topic, payload);
}

(window as any).publish = publish;
