tar -czvf dashboard-ssd-fe.tar.gz --exclude='node_modules' --exclude='*.gz' --exclude='*.sh' * .env.* &&
scp -P 22422 ./dashboard-ssd-fe.tar.gz user-poc@43.241.148.234:/home/user-poc &&
ssh -p 22422 user-poc@43.241.148.234 ./dashboard-ssd-fe.sh