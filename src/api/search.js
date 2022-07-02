import request from '@/utils/request'

/**
 *搜索联想数据列表
 * @param {搜索关键词} q
 * @returns
 */
export const getSuggestList = (q) => {
  return request({
    method: 'GET',
    url: '/suggestion',
    params: {
      q
    }
  })
}

/**
 * page = 1  等于号是默认值
 * @param  page页数  per_page每页数量  q关键词
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    method: 'GET',
    url: '/search',
    params: { page, per_page, q }
  })
}
