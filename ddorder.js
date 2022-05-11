const matrix = init()

;(exec = async () => {
    matrix.log(`🔔 捕获到下单请求，开始增量`)
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
          if(JSON.parse(data).code == -3000){
            matrix.log(`❌ 抱歉人多拥挤 --【${cnt}】(${JSON.parse(data).code}): ${JSON.parse(data).msg}`)
            matrix.successReport();
            resolve()
          }
          else if(JSON.parse(data).code == -3001){
            matrix.log(`❌ 前方拥挤，稍后再试 --【${cnt}】(${JSON.parse(data).code})`)
            matrix.successReport();
            resolve()
          }
          else if(JSON.parse(data).success == true){
            matrix.msg(`⭕ 订单提交成功`, `【${cnt}】已成功下单，请立即支付`, `msg: ${JSON.parse(data).msg}`)
            matrix.log(`⭕ 订单提交成功 --【${cnt}】`)
            resolve()
          }
          else if(JSON.parse(data).code == 5003){
            matrix.msg(`❌ 商品全部售罄`, `【${cnt}】返回结果：商品全部售罄`, `msg: ${JSON.parse(data).msg}`)
            matrix.log(`❌ 商品全部售罄 --【${cnt}】: ${JSON.parse(data).msg}`)
            resolve()
          }
          else if(JSON.parse(data).code == 5014){
            matrix.log(`❌ 暂未营业 --【${cnt}】: ${JSON.parse(data).msg}`)
            resolve()
          }
          else{
            matrix.log(`❌ 下单失败--【${cnt}】(${JSON.parse(data).code}): ${JSON.parse(data).msg}`)
            resolve()
          }
          
        } catch (e) {
            matrix.log(`❌ 错误 --【${cnt}】: ${e}`)
            matrix.log(`❌ 错误 --【${cnt}】 - response: ${JSON.stringify(response)}`)
          resolve()
        }
      })
    })
  }

  function successReport() {
    return new Promise((resolve, reject) => {

        const url = { url: 'https://api.onbeta.com:14000/orderreport', headers: $request.headers }
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
          if(JSON.parse(data).code == 0){
            matrix.log(`✅ 已成功上报`)
            resolve()
          }
          else{
            matrix.log(`❎ 上报失败`)
            resolve()
          }
          
        } catch (e) {
            matrix.log(`❎ 错误 : ${e}`)
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
  
