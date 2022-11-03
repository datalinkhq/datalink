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

import { PrismaClient as PrismaClientDev } from '@prisma/client/edge';
/**
 * Prisma client with production/development mode.
 * @returns {PrismaClientDev} 
 */
let prisma: PrismaClientDev;

if (process.env.NODE_ENV === "development") {
  prisma = new PrismaClientDev();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClientDev;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClientDev();
  }
  prisma = globalWithPrisma.prisma;
} 

export default prisma;