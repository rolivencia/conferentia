import { Injectable } from '@nestjs/common';
import { ConnectorService } from '../shared/connectors/connector.service';
import { User } from '@conferentia/models';

@Injectable()
export class UserService {
  constructor(private connectorService: ConnectorService) {}

  getByEmail(email: string): Promise<User> {
    return null;
  }
  getById(id: string): Promise<User> {
    return null;
  }

  create(user: Partial<User>) {
    return null;
  }

  update(user: User) {
    return null;
  }
}
