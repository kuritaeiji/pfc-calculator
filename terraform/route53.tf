resource "aws_route53_zone" "route53_zone" {
  name = var.domain

  tags = {
    "Name" = var.domain
  }
}

resource "aws_route53_record" "route53_record" {
  zone_id = aws_route53_zone.route53_zone.id
  name = var.domain
  type = "A"

  alias {
    name = aws_cloudfront_distribution.cloudfront_distribution.domain_name
    zone_id = aws_cloudfront_distribution.cloudfront_distribution.hosted_zone_id
     evaluate_target_health = false
  }
}
