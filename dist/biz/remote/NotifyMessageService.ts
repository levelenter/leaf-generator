import { NotifyMessage } from '../../dto/NotifyMessage';


import { GeneratedBizBase } from '../GeneratedBizBase';


import { Response } from '../Response';export class NotifyMessageService extends GeneratedBizBase{
  async selectAll(): Promise<Response<NotifyMessage[]>> {
    return super.restCall<Response<NotifyMessage[]>>('get', '/v1/NotifyMessageService/selectAll', arguments);
  }
  async addNew(): Promise<Response<number>> {
    return super.restCall<Response<number>>('post', '/v1/NotifyMessageService/addNew', arguments);
  }
}
