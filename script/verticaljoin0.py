import os
import sys
currentdir = os.path.dirname(os.path.realpath(__file__))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)

from operations.connectors import findconnector

def simplejoin(spaceA, spaceB):

    Aconnectors = findconnector(spaceA)
    Bconnectors = findconnector(spaceB)

    getLargest = lambda det, array: (det(elem['x'] for elem in array))
    getElem = lambda det, array: next((el for el in array if el['x'] == getLargest(det, array)), None)

    ATOP = getElem(max, Aconnectors['verticalTOP'])
    BTOP = getElem(min, Bconnectors['verticalTOP'])

    ABOT = getElem(max, Aconnectors['verticalBOT'])
    BBOT = getElem(min, Bconnectors['verticalBOT'])

    if ATOP != None or BTOP != None:
        return {
            'A': ATOP,
            'B': BTOP
        }
    else:
        return {
            'A': ABOT,
            'B': BBOT
        }

def Btranslation(spaceA, spaceB):
    sjoin = simplejoin(spaceA, spaceB)
    return {
        'x': sjoin['A']['x'] - sjoin['B']['x'] ,
        'y': sjoin['A']['y'] - sjoin['B']['y']
    }
