ansible-playbook -v ./docker/publish.yml
curl https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=08d6354d-5048-48f4-8754-943e0e4af2a3 -d '{"msgtype":"text", "text":{ "content": "服务器更新成功:'`date`'"}}'
