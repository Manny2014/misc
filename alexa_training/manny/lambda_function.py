import boto3
import json

s3 = boto3.resource('s3')

content_object = s3.Object('com.er.alexa', 'manny/brain.json')
file_content = content_object.get()['Body'].read().decode('utf-8')
BRAIN_DATA = json.loads(file_content)

def lambda_handler(event, context):

    event_type = event['request']['type']

    if event_type == 'LaunchRequest':
        return onLaunch()
    elif event_type == 'IntentRequest':

        if event['request']['intent']['name'] == 'BeCreepy':
            return_data ={
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": """<speak>
                    <prosody pitch="low" rate="slow">Have you ever heard of a bad<break time="1s"/></prosody><prosody pitch="low" rate="slow"><emphasis level="strong"> titty?</emphasis></prosody>
</speak>"""
                }
            }
            return buildResponse(sessionAttributes={}, resp=return_data)
        elif event['request']['intent']['name'] == 'WhatDoesTrumpThink':
            import json
            from six.moves import urllib

            result = urllib.request.urlopen("https://api.whatdoestrumpthink.com/api/v1/quotes/random")
            message = json.loads(result.read())['message']
            return_data = {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": message
                }
            }
            return buildResponse(sessionAttributes={}, resp=return_data)
        else:
            return onIntent(event['request'], event['session'])

def generateIntentResponse(intent_name, slots):
    return_data = {"text": "Something went wrong with your request. Try again, now.", "shouldEndSession": False}

    if intent_name in BRAIN_DATA['intents']:
        intent_info = BRAIN_DATA['intents'][intent_name]
        return_data["shouldEndSession"] = intent_info['shouldEndSession']
        if 'options' in intent_info:
            import random
            if len(slots) > 0:
                format_value = {}
                for k,v in slots.items():
                    format_value[k] = v['value']
                return_data["text"] = str(random.choice(intent_info['options'])).format(**format_value)
            else:
                return_data["text"] = str(random.choice(intent_info['options']))
        else:
            return_data["text"] = intent_info["text"]
    else:
        return_data["text"] = "Intent {0} not found. Please try again.".format(intent_name)

    return return_data

def onIntent(request, session):

    intent = request['intent']
    intent_name = intent['name']
    if 'slots' in intent:
        slots = intent["slots"]
    else:
        slots = {}

    out_data = generateIntentResponse(intent_name, slots)
    return buildResponse(sessionAttributes={},
                         resp=buildSpeechletResponse(title="",
                                                     output=out_data["text"],
                                                     shouldEndSession=out_data["shouldEndSession"]))

def onLaunch():
    session_attributes = {}
    return buildResponse(sessionAttributes=session_attributes,
                         resp=buildSpeechletResponse(title="Welcome",
                                                     output=BRAIN_DATA['welcomeMessage'],
                                                     shouldEndSession=False))


def buildSpeechletResponse(title, output, shouldEndSession):
    repromptText = "Bruh please...trye again"
    return {
        "outputSpeech": {
        "type": "PlainText",
        "text": output
        },
        "card": {
            "type": "Simple",
            "title": title,
            "content": output
        },
        "reprompt": {
            "outputSpeech": {
                "type": "PlainText",
                "text": repromptText
            }
        },
        "shouldEndSession": shouldEndSession
    }

def buildResponse(sessionAttributes, resp):
    return {
        "version": '1.0',
        "response": resp
    }
