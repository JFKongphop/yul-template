com:
	node compiler/solc.js Pure

call:
	node shortcuts/call.js

t:
	make com && npx hardhat test test/test.ts 

deploy:
	npx hardhat run --network ${chain} scripts/deploy.ts