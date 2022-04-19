const matrix = init()

;(exec = async () => {
    matrix.log(`🔔 开始复制`)
    for (let i = 1; i < 150; i++) await clone(i)
  })()
  .catch((e) => matrix.log(`❌ 复制失败: ${e}`))
  .finally(() => matrix.done())

  function clone(cnt) {
    return new Promise((resolve, reject) => {

        const url = { url: $request.url, headers: $request.headers }
    //   url.headers['Accept'] = '*/*'
    //   url.headers['Origin'] = 'https://activity.m.ddxq.mobi'
    //   url.headers['Accept-Encoding'] = 'gzip, deflate, br'
    //   url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //   url.headers['Host'] = 'ddxq.mobi'
    //   url.headers['Connection'] = 'keep-alive'
    //   url.headers['Referer'] = 'https://activity.m.ddxq.mobi/'
    //   url.headers['Content-Length'] = '129'
    //   url.headers['Accept-Language'] = 'zh-cn'

         url.headers = $request.headers
         url.body = $request.body
   
         
      matrix.post(url, (error, response, data) => {
        try {
          if(JSON.parse(data).success == true){
            matrix.msg(`⭕ 下单成功`, `【${cnt}】已成功下单，请立即支付`, `msg: ${JSON.parse(data).msg}`)
            matrix.log(`⭕ 下单成功--【${cnt}】`)
            resolve()
          }
          else{
            matrix.log(`❌ 下单失败--【${cnt}】: ${JSON.parse(data).msg}`)
            resolve()
          }
          
        } catch (e) {
            matrix.log(`❌ 下单失败--【${cnt}】: ${e}`)
            matrix.log(`❌ 下单失败--【${cnt}】 - response: ${JSON.stringify(response)}`)
          resolve()
        }
      })
    })
  }



  function init() {
    isSurge = () => {
      return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
      return undefined === this.$task ? false : true
    }
    msg = (title, subtitle, body) => {
      if (isSurge()) $notification.post(title, subtitle, body)
      if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
      if (isSurge()) {
        $httpClient.get(url, cb)
      }
      if (isQuanX()) {
        url.method = 'GET'
        $task.fetch(url).then((resp) => cb(null, resp, resp.body))
      }
    }
    post = (url, cb) => {
      if (isSurge()) {
        $httpClient.post(url, cb)
      }
      if (isQuanX()) {
        url.method = 'POST'
        $task.fetch(url).then((resp) => cb(null, resp, resp.body))
      }
    }
    done = (value = {}) => {
      $done(value)
    }
    return { isSurge, isQuanX, msg, log, get, post, done }
  }
  
