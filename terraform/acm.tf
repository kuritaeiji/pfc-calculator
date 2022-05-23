resource "aws_acm_certificate" "acm_cert" {
  provider = aws.us
  domain_name = var.domain
  validation_method = "DNS"
}

// domain所持の確認のためにレコードを作成する
resource "aws_route53_record" "route53_record_acm" {
  for_each = {
    for dvo in aws_acm_certificate.acm_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.route53_zone.zone_id
}

resource "aws_acm_certificate_validation" "acm_validation" {
  provider = aws.us
  certificate_arn         = aws_acm_certificate.acm_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.route53_record_acm : record.fqdn]
}
