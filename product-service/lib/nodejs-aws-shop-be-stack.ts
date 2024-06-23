import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda, aws_apigateway as apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class NodejsAwsShopBeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const productsLambda = new lambda.Function(
        this,
        'productsLambda',
        {
          runtime: lambda.Runtime.NODEJS_20_X,
          code: lambda.Code.fromAsset('lambda'),
          handler: 'getProductsList.handler',
        });

    const productByIdLambda = new lambda.Function(
        this,
        'productByIdLambda',
        {
          runtime: lambda.Runtime.NODEJS_20_X,
          code: lambda.Code.fromAsset('lambda'),
          handler: 'getProductById.handler',
        });

    const api = new apigateway.RestApi(
        this,
        'ProductApi',
        {
          restApiName: 'Products Service',
          defaultCorsPreflightOptions: {
            allowOrigins: apigateway.Cors.ALL_ORIGINS,
            allowMethods: apigateway.Cors.ALL_METHODS,
          },
        });

    const productsResource = api.root.addResource('products');
    productsResource.addMethod('GET', new apigateway.LambdaIntegration(productsLambda));

    const productByIdResource = productsResource.addResource('{productId}');
    productByIdResource.addMethod('GET', new apigateway.LambdaIntegration(productByIdLambda));
  }
}
