import errHandler from "./errHandler";
export function makeController(controller) {
  return async (req, res) => {
    try {
      const httpRequest = await {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        strToken: req.strToken,
        strUserId: req.strUserId,
        strUserRole: req.strUserRole,
        method: req.method,
        timReceived: new Date(new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata'
        })),
        path: req.originalUrl,
        strAudience: (req.get("str-audience") || '').toUpperCase(),
        headers: {
          "Content-Type": req.get("Content-Type"),
          Referer: req.get("referer"),
          "User-Agent": req.get("User-Agent")
        }
      };
      console.log("ObjRequst Body\n :", new Date(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata'
      })));
      console.log(req.body);
      await controller(httpRequest)
        .then(
          ({
            headers: headers = {
              "Content-Type": "application/json",
              "Last-Modified": new Date(new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Kolkata'
              }))
            },
            type = "json",
            statusCode: code = 200,
            body
          }) => {
            if (!body) throw new Error("EMPTY_RESPONSE");
            res.set(headers);
            res.type(type);
            if (code == 400) {
              res.status(code).send({
                ...body,
                "blnAPIStatus": false
              });
            } else {
              res.status(code).send({
                ...body,
                "blnAPIStatus": true,
                strToken: httpRequest["strToken"]
              });
            }
          }
        )
        .catch(async error => {
          let Responce = new errHandler(error).send();
          res
            .status(Responce.statusCode)
            .set({
              "Content-Type": "application/json",
              "Last-Modified": new Date(new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Kolkata'
              }))
            })
            .send({
              ...Responce.body,
              "blnAPIStatus": false
            });
        });
    } catch (error) {
      let Responce = new errHandler(error).send();
      res
        .status(Responce.statusCode)
        .set({
          "Content-Type": "application/json",
          "Last-Modified": new Date(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata'
          }))
        })
        .send({
          ...Responce.body,
          "blnAPIStatus": false
        });
    }
  };
}