// Copyright 2022 Juanjo Jaramillo <contact@juanjodev02.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * @author Juanjo Jaramillo <contact@juanjodev02.com>
 * @description Users service class
 * @class UsersService
 */
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  /**
   * @author Juanjo Jaramillo <contact@juanjodev02.com>
   * @description Create a new user to the database
   * @param createUserDto Create user DTO object
   * @returns @type {Promise<CreateUserDto>} User object created
   */
  public create(createUserDto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data: createUserDto });
  }

  public findAll() {
    return `This action returns all users`;
  }

  public findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  public update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public remove(id: string) {
    return `This action removes a #${id} user`;
  }

  public updateUserConnection(
    id: string,
    connectionState: boolean,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: {
        isConnected: connectionState,
      },
    });
  }

  public async getConnectedUsers(userId: string): Promise<User[]> {
    const connectedUsers = await this.prismaService.user.findMany({
      where: {
        isConnected: true,
      },
    });
    // remove the current user from the list
    return connectedUsers.filter((user) => user.id !== userId);
  }

  public async findOneByFirebaseId(firebaseId: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        firebaseUID: firebaseId,
      },
    });
  }
}
