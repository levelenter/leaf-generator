import express from 'express';
import { errorHandler } from './web_handler';
import { tokenHandler } from './tokenHandler';
import { AuthService } from '../AuthService';
import { NotifyMessageService } from '../NotifyMessageService';


export const generatedRest = express.Router();

generatedRest.post('/v1/AuthService/classRoomLogin',
async (req: express.Request, res: express.Response) => {
  const biz = new AuthService();
  try{
    tokenHandler(req, false, ["user_id","member_id"] );
    const result = await biz.classRoomLogin(parseFloat(req.body[0] as string) as number,parseFloat(req.body[1] as string) as number);
    res.send(result);
  } catch(error) {
    errorHandler(res, error as any);
  }
});

generatedRest.post('/v1/AuthService/forceLogin',
async (req: express.Request, res: express.Response) => {
  const biz = new AuthService();
  try{
    tokenHandler(req, true, ["mail"] );
    const result = await biz.forceLogin(req.body[0] as string);
    res.send(result);
  } catch(error) {
    errorHandler(res, error as any);
  }
});



generatedRest.get('/v1/NotifyMessageService/selectAll',
async (req: express.Request, res: express.Response) => {
  const biz = new NotifyMessageService();
  try{
    tokenHandler(req, true, [] );
    const result = await biz.selectAll();
    res.send(result);
  } catch(error) {
    errorHandler(res, error as any);
  }
});

generatedRest.post('/v1/NotifyMessageService/addNew',
async (req: express.Request, res: express.Response) => {
  const biz = new NotifyMessageService();
  try{
    tokenHandler(req, true, [] );
    const result = await biz.addNew();
    res.send(result);
  } catch(error) {
    errorHandler(res, error as any);
  }
});



