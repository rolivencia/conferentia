import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { User } from '@conferentia/models';
import { SanityClient } from '@sanity/client';

@Injectable()
export class UserService {
  constructor(private connectorService: ConnectorService) {}

  public async getByEmail(email: string): Promise<User> {
    const query = `*[ _type == 'user' && email == '${email}' ][0]
                    { _id, _createdAt, _updatedAt, _type, _rev, email, firstName, lastName, courtesyTitle, affiliation, country, hasFinishedRegistration }`;
    return await this.connectorService.connector.fetch(query, {});
  }

  public async getById(id: string): Promise<User> {
    const query = `*[ _type == 'user' && _id == '${id}' ][0]
                    { _id, _createdAt, _updatedAt, _type, _rev, email, firstName, lastName, courtesyTitle, affiliation, country, hasFinishedRegistration }`;
    return await this.connectorService.connector.fetch(query, {});
  }

  public async create(user: Partial<User>): Promise<User> {
    const document = {
      _type: 'user',
      email: user.email,
      hasFinishedRegistration: false,
    };

    return this.connectorService.connector.create(document);
  }

  public async update(user: User): Promise<User> {
    const connector = this.connectorService.connector as SanityClient;
    const { _id, _createdAt, _type, _updatedAt, _rev, email, ...userData } =
      user;
    return connector.patch(_id).set(userData).commit();
  }
}
