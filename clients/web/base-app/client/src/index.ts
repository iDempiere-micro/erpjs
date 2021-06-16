import { MessageBus } from '@podium/browser';

const publishFeatures =  (features: any[]) => {
    const messageBus = new MessageBus();
    console.log('*** going to publish', features);
    messageBus.publish('features', 'newFeatures', features);
}

(window as any).publishFeatures = publishFeatures;
