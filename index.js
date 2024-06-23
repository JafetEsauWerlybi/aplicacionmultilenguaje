/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const data = {
  en: [
    'The oldest known tattoos were found on mummies from Ancient Egypt.',
    'In Japan, tattoos were historically used to mark criminals.',
    'The term "tattoo" comes from the Polynesian word "tatau," which means "to mark something."',
    'Tattoo ink is placed in the dermis, the second layer of skin.',
    'In some cultures, tattoos are a rite of passage into adulthood.',
    'The Māori of New Zealand have a facial tattoo tradition called "ta moko."',
    'Thomas Edison invented a machine that became the basis for the first electric tattoo machine.',
    'During World War II, many soldiers tattooed their blood type in case of emergency.',
    'There are tattoo inks that glow under ultraviolet light.',
    'Laser tattoo removal is possible but can be a long and painful process.'
  ],
  es: [
    'Los tatuajes más antiguos conocidos fueron encontrados en las momias del Antiguo Egipto.',
    'En Japón, los tatuajes eran usados históricamente para marcar a los criminales.',
    'El término "tatuaje" proviene de la palabra polinesia "tatau," que significa "marcar algo".',
    'La tinta de los tatuajes se coloca en la dermis, la segunda capa de la piel.',
    'En algunas culturas, los tatuajes son un rito de paso hacia la adultez.',
    'Los maoríes de Nueva Zelanda tienen una tradición de tatuajes faciales llamada "ta moko".',
    'Thomas Edison inventó una máquina que se convirtió en la base de la primera máquina de tatuar eléctrica.',
    'Durante la Segunda Guerra Mundial, muchos soldados se tatuaron su grupo sanguíneo en caso de emergencia.',
    'Existen tintas de tatuaje que brillan bajo luz ultravioleta.',
    'La eliminación de tatuajes con láser es posible, pero puede ser un proceso largo y doloroso.'
  ]
};

const languageStrings = {  
en: {
    translation: {
      GET_FRASES_MSG: 'Something curious about tattoos is that these...',
      GET_FRASES_MSGSalida: '... you can ask for another fun fact... say "tell me a fun fact about the tattoo" ... or if you want to stop me just say, Cancel! ...so...how can I help you?',

      WELCOME_MESSAGE: 'Welcome to tattoo world, you can say Hello or Help. Which would you like to try?',
      HELLO_MESSAGE: 'Hello Tattoo World!',
      HELP_MESSAGE: 'You can say hello to me! How can I help?',
      GOODBYE_MESSAGE: 'Goodbye dummie!',
      REFLECTOR_MESSAGE: 'You just triggered  Esau %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again bro',
      ERROR_MESSAGE: 'Sorry, there was an error. Please try again bro.',
      
    }
},

es: {
    translation: {
      GET_FRASES_MSG: 'Un dato interesante de los tatuajes es que...',
      GET_FRASES_MSGSalida: '... puedes pedir otro dato curioso... di "dime un dato curioso del tatuaje" ... o si deseas detenerme solo di, ¡Cancela! ... entonces ... ¿cómo te puedo ayudar?',
      WELCOME_MESSAGE: 'Bienvenido al mundo del tatuaje, puedes decir Hola o Ayuda. Cual prefieres?',
      HELLO_MESSAGE: 'Hola al Mundo del tatuaje!',
      HELP_MESSAGE: 'Puedes decirme hola. Cómo te puedo ayudar master?',
      GOODBYE_MESSAGE: 'Adiós master!',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez carnal.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez hermano.'
    }
}
}



const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const TattooIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TattooIntent';
  },
  handle(handlerInput) {
    const locale = handlerInput.requestEnvelope.request.locale;
    const language = locale.substring(0, 2);
    const frasesArray = data[language] || data['en'];  // default to English if the language is not supported
    const frasesIndice = Math.floor(Math.random() * frasesArray.length);
    const randomFrase = frasesArray[frasesIndice];
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const PrimerMsg = requestAttributes.t('GET_FRASES_MSG');
    const MsgSalida = requestAttributes.t('GET_FRASES_MSGSalida');
    const speakOutput = `${PrimerMsg} ${randomFrase}${MsgSalida}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t(`REFLECTOR_MESSAGE ${intentName}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        TattooIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
        .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();