AWS_REGION=eu-central-1 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=eu-west-1 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=eu-west-2 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=us-east-1 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=us-east-2 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=us-west-2 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=ap-south-1 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=ap-southeast-1 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=ap-southeast-2 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped
AWS_REGION=ap-northeast-1 npx remotion lambda sites create remotion/index.tsx --site-name=wrapped

AWS_REGION=eu-west-1 npx remotion lambda functions deploy
AWS_REGION=eu-west-2 npx remotion lambda functions deploy
AWS_REGION=us-east-1 npx remotion lambda functions deploy
AWS_REGION=us-east-2 npx remotion lambda functions deploy
AWS_REGION=us-west-2 npx remotion lambda functions deploy
AWS_REGION=ap-south-1 npx remotion lambda functions deploy
AWS_REGION=ap-southeast-1 npx remotion lambda functions deploy
AWS_REGION=ap-southeast-2 npx remotion lambda functions deploy
AWS_REGION=ap-northeast-1 npx remotion lambda functions deploy
AWS_REGION=eu-central-1 npx remotion lambda functions deploy
