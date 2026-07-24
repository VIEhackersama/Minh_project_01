package com.school.records.modules.records.controller;

import com.school.records.modules.records.entity.HoSo;
import com.school.records.modules.records.repository.HoSoRepository;
import com.school.records.modules.records.service.QrCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/qr")
public class QrCodeController {

    @Autowired
    private QrCodeService qrCodeService;

    @Autowired
    private HoSoRepository hoSoRepository;

    @GetMapping(value = "/ho-so/{id}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getHoSoQrCode(
            @PathVariable("id") Long id,
            @RequestParam(value = "width", defaultValue = "300") int width,
            @RequestParam(value = "height", defaultValue = "300") int height
    ) {
        try {
            HoSo hoSo = hoSoRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ với id: " + id));

            String locationStr = hoSo.getViTri() != null ? hoSo.getViTri().getMaDinhDanhViTri() : "CHUA_GAN";

            // Format QR payload text or JSON
            String qrContent = String.format(
                    "{\"maHoSo\":\"%s\",\"tenHoSo\":\"%s\",\"viTri\":\"%s\"}",
                    hoSo.getMaHoSo(),
                    hoSo.getTenHoSo(),
                    locationStr
            );

            byte[] qrBytes = qrCodeService.generateQrCodePng(qrContent, width, height);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentLength(qrBytes.length);
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"QR_" + hoSo.getMaHoSo() + ".png\"");

            return new ResponseEntity<>(qrBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/decode")
    public ResponseEntity<?> decodeQrImage(@RequestParam("file") MultipartFile file) {
        try {
            String decodedText = qrCodeService.decodeQrCodeImage(file);
            Map<String, Object> response = new HashMap<>();
            response.put("raw", decodedText);

            // Attempt to parse maHoSo if contained in JSON or raw string
            String maHoSo = decodedText;
            if (decodedText.contains("\"maHoSo\":\"")) {
                int start = decodedText.indexOf("\"maHoSo\":\"") + 10;
                int end = decodedText.indexOf("\"", start);
                if (end > start) {
                    maHoSo = decodedText.substring(start, end);
                }
            }
            response.put("maHoSo", maHoSo);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Không thể đọc mã QR từ ảnh tải lên. Vui lòng kiểm tra lại ảnh!"));
        }
    }
}
