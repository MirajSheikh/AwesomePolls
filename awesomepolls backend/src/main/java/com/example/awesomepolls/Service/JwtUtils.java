package com.example.awesomepolls.Service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Component
public class JwtUtils {

    private static final String secret= "P9vRxDAXelxnXFe8NpcvOJ8DLw3sJv9ZCEikVQl1wzE=";

//    generate key
    private static final SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));


    public Authentication getAuthentication(String token){
        try{

            JwtParser parser = Jwts.parser()
                    .verifyWith(secretKey)
                    .build();

            Jws<Claims> claimsJws = parser.parseSignedClaims(token);
            Claims claims = claimsJws.getPayload();

            String username = claims.getSubject();
            if(username == null) return null;

            return new UsernamePasswordAuthenticationToken(username, null);

        } catch (JwtException e) {
            System.out.println("Websocket JWT Failed in -> JwtUtils.java");
            return null;
        }
    }

}
