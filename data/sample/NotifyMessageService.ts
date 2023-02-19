import { PoolConnection } from 'mysql2/promise';
import { Rest } from '../../framework/lib/@Rest';
import { Transactional } from '../../framework/lib/@Transactional';
import { NotifyMessage } from "../../dist/dto/NotifyMessage"
import { Response } from '../../framework/lib/Response';
const NotifyMessageDaoGen = require('../../dist/dao/NotifyMessageDaoGen').NotifyMessageDaoGen;
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
