import { message } from 'antd';
import { getUsers } from '../api/user';

const vm = {
  namespace: 'user-list',
  state: {
    records: []
  },
  hooks: {
    onEnterView() {
      this.fetchUserList();
    }
  },
  sagas: {
    *fetchUserList({ putState, call }, action) {
      try {
        let result = yield call(getUsers);
        yield putState({
          records: result
        });
      } catch (e) {
        console.error(e);
        message.error(e.message || '获取数据失败');
      }
    }
  }
};

export default vm;
