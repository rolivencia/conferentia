import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { User } from '@conferentia/models';

@Injectable()
export class UserService {
  constructor(private connectorService: ConnectorService) {}

  public async getByEmail(email: string): Promise<User> {
    const query = `*[ _type == 'user' && email == '${email}' ]
                    { _id, _createdAt, _updatedAt, _type, _rev, email, hasFinishedRegistration }`;
    return await this.connectorService.connector.fetch(query, {});
  }

  public async getById(id: string): Promise<User> {
    const query = `*[ _type == 'user' && _id == '${id}' ]
                    { _id, _createdAt, _updatedAt, _type, _rev, email, hasFinishedRegistration }`;
    return await this.connectorService.connector.fetch(query, {});
  }

  create(user: Partial<User>) {
    return null;
  }

  update(user: User) {
    return null;
  }
}
