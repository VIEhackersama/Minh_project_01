package com.school.records.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret:school-records-super-secret-key-1234567890-abcdef-ghijk}")
    private String secretKey;

    @Value("${jwt.access-token-expiration:900000}") // 15 minutes in ms
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration:604800000}") // 7 days in ms
    private long refreshTokenExpiration;

    private static final String ISSUER = "school-records";

    public String generateAccessToken(UserDetails userDetails) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        
        // Fetch role if present
        String role = userDetails.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .filter(auth -> auth.startsWith("ROLE_"))
                .map(auth -> auth.replace("ROLE_", ""))
                .findFirst()
                .orElse("TEACHER");

        return JWT.create()
                .withIssuer(ISSUER)
                .withSubject(userDetails.getUsername())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .withClaim("role", role)
                .sign(algorithm);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withIssuer(ISSUER)
                .withSubject(userDetails.getUsername())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .sign(algorithm);
    }

    public String extractUsername(String token) {
        return decodeToken(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return decodeToken(token).getExpiresAt().before(new Date());
    }

    private DecodedJWT decodeToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(ISSUER)
                .build();
        return verifier.verify(token);
    }
}
