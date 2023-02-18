import { PoolConnection } from 'mysql2/promise';
import { Rest } from '../lib/@Rest';
import { Transactional } from '../lib/@Transactional';
import { NotifyMessage } from '../../dist/dto/NotifyMessage';
import { Response } from '../lib/Response';
import { NotifyMessageDaoGen } from '../../dist/dao/NotifyMessageDaoGen';
export class NotifyMessageService {
  connection!: PoolConnection;

  @Rest('/v1/NotifyMessageService/selectAll', 'get')
  @Transactional('connection')
  async selectAll(): Promise<Response<NotifyMessage[]>> {
    const dao = new NotifyMessageDaoGen(this.connection);
    return new Response([new NotifyMessage()]);
  }


  @Rest('/v1/NotifyMessageService/addNew', 'post')
  @Transactional('connection')
  async addNew(): Promise<Response<number>> {
    const dao = new NotifyMessageDaoGen(this.connection);
    const result = await dao.insert(new NotifyMessage());
    return new Response(result.affectedRows);
  }
}
