package com.school.records.modules.records.service;

import com.school.records.modules.records.entity.HoSo;
import com.school.records.modules.records.entity.TaiLieuSoHoa;
import com.school.records.modules.records.repository.HoSoRepository;
import com.school.records.modules.records.repository.TaiLieuSoHoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
public class TaiLieuSoHoaService {

    @Autowired
    private TaiLieuSoHoaRepository repository;

    @Autowired
    private HoSoRepository hoSoRepository;

    @Autowired
    private MinioService minioService;

    public List<TaiLieuSoHoa> getByHoSoId(Long hoSoId) {
        return repository.findByHoSoId(hoSoId);
    }

    public TaiLieuSoHoa getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài liệu số hóa: " + id));
    }

    public TaiLieuSoHoa uploadDocument(Long hoSoId, MultipartFile file) throws Exception {
        HoSo hoSo = hoSoRepository.findById(hoSoId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hồ sơ: " + hoSoId));

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Tệp tải lên không được rỗng");
        }

        byte[] bytes = file.getBytes();
        String checksum = MinioService.calculateSha256(bytes);

        String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex + 1).toLowerCase();
        }

        String objectName = "ho-so/" + hoSoId + "/" + UUID.randomUUID().toString() + "_" + originalFilename;

        minioService.uploadFile(objectName, file.getInputStream(), file.getSize(), file.getContentType());

        TaiLieuSoHoa taiLieu = TaiLieuSoHoa.builder()
                .hoSo(hoSo)
                .tenTaiLieu(originalFilename)
                .duongDanFile(objectName)
                .checksum(checksum)
                .kichThuoc(file.getSize())
                .dinhDangFile(extension)
                .build();

        return repository.save(taiLieu);
    }

    public InputStream downloadDocumentStream(Long documentId) throws Exception {
        TaiLieuSoHoa taiLieu = getById(documentId);
        return minioService.downloadFile(taiLieu.getDuongDanFile());
    }

    public void deleteDocument(Long documentId) throws Exception {
        TaiLieuSoHoa taiLieu = getById(documentId);
        try {
            minioService.removeFile(taiLieu.getDuongDanFile());
        } catch (Exception e) {
            // Log warning if object was missing on storage
        }
        repository.delete(taiLieu);
    }
}
