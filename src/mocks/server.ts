import { setupServer } from 'msw/node';
import { authHandlers } from './handlers';
import { commentHandlers } from './handlers/comment';
import { fanfalPartHandlers } from './handlers/fanfalParticipaiton';
import { getBoardHandlers } from './handlers/getBoards';
import { imageHandlers } from './handlers/imgS3';
import { createBoardHandlers } from './handlers/createFanfal';
import { wishLikeHandlers } from './handlers/like';
import { mypageHandlers } from './handlers/mypage';
import { detailHandlers } from './handlers/detail';

// MSW 서버를 설정합니다.
export const server = setupServer(
    ...authHandlers,
    ...commentHandlers,
    ...fanfalPartHandlers,
    ...getBoardHandlers,
    ...imageHandlers,
    ...createBoardHandlers,
    ...wishLikeHandlers,
    ...mypageHandlers,
    ...detailHandlers
);
