package com.ican.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author liuris
 * @create 2023-05-01-12:05
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "upload.qioss")
public class QiOssProperties {

    /**
     * oss域名
     */
    private String baseurl;


    /**
     * 访问密钥id
     */
    private String accessKey;

    /**
     * 访问密钥密码
     */
    private String secretKey;

    /**
     * bucket名称
     */
    private String bucket;
}
