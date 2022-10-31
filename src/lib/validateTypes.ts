// $$$$$$$\             $$\               $$\ $$\           $$\       
// $$  __$$\            $$ |              $$ |\__|          $$ |      
// $$ |  $$ | $$$$$$\ $$$$$$\    $$$$$$\  $$ |$$\ $$$$$$$\  $$ |  $$\ 
// $$ |  $$ | \____$$\\_$$  _|   \____$$\ $$ |$$ |$$  __$$\ $$ | $$  |
// $$ |  $$ | $$$$$$$ | $$ |     $$$$$$$ |$$ |$$ |$$ |  $$ |$$$$$$  / 
// $$ |  $$ |$$  __$$ | $$ |$$\ $$  __$$ |$$ |$$ |$$ |  $$ |$$  _$$<  
// $$$$$$$  |\$$$$$$$ | \$$$$  |\$$$$$$$ |$$ |$$ |$$ |  $$ |$$ | \$$\ 
// \_______/  \_______|  \____/  \_______|\__|\__|\__|  \__|\__|  \__|     
                 
// Copyright (c) 2022 Datalink Contributors. All rights reserved.  

// This source code is licensed under the MIT license.
// See LICENSE file in the project root for more details.
// Original licensing can be found in LICENSE in the root 
// directory of this source tree.



// NOTE: THIS IS AS WE NOW USE ZOD!
function validateAuthTypes(id: any, token: any): boolean {
    if (typeof id === 'number' && typeof token === 'string') {
        return true
    } else {
        return false
    }
}

function validateCreationTypes(name: any, password: any): boolean {
    if (typeof name === 'string' && typeof password === 'string') {
        return true
    } else {
        return false
    }
}

function validateInputLogTypes(endpoint: string, id: any, token: any, trace?: any, type?: any, message?: any, logid?: any): boolean | Error | undefined {
    if (endpoint == 'publish') {
        if (typeof id === 'number' && typeof token === 'string' && typeof trace === 'string' && typeof type === 'string' && typeof message === 'string') {
            return true
        } else {
            return false
        }
    }

    if (endpoint == 'fetch') {
        if (logid) {
            if (typeof id === 'number' && typeof token === 'string' && typeof logid === 'number') {
                return true
            } else {
                return false
            }
        }

        if (!logid) {
            validateAuthTypes(id, token)
        }
    }

    if (!endpoint) {
        Error('Invalid endpoint type')
    }

}


export { validateAuthTypes, validateCreationTypes, validateInputLogTypes }