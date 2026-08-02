package com.school.records;

import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.admin.entity.VaiTro;
import com.school.records.modules.admin.service.AuditService;
import com.school.records.modules.records.controller.TaiLieuSoHoaController;
import com.school.records.modules.records.entity.HoSo;
import com.school.records.modules.records.entity.MucDoMat;
import com.school.records.modules.records.entity.TaiLieuSoHoa;
import com.school.records.modules.records.service.TaiLieuSoHoaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.ByteArrayInputStream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ConfidentialAccessTest {

    @Mock
    private TaiLieuSoHoaService service;

    @Mock
    private AuditService auditService;

    @InjectMocks
    private TaiLieuSoHoaController controller;

    private TaiLieuSoHoa confidentialDoc;
    private TaiLieuSoHoa commonDoc;

    @BeforeEach
    void setUp() {
        HoSo confidentialHoSo = HoSo.builder()
                .id(100L)
                .maHoSo("HS-CONFIDENTIAL")
                .tenHoSo("Hồ sơ Bảo Mật")
                .mucDoMat(MucDoMat.CONFIDENTIAL)
                .build();

        confidentialDoc = TaiLieuSoHoa.builder()
                .id(1L)
                .hoSo(confidentialHoSo)
                .tenTaiLieu("bao_mat.pdf")
                .dinhDangFile("pdf")
                .build();

        HoSo commonHoSo = HoSo.builder()
                .id(200L)
                .maHoSo("HS-COMMON")
                .tenHoSo("Hồ sơ Thường")
                .mucDoMat(MucDoMat.COMMON)
                .build();

        commonDoc = TaiLieuSoHoa.builder()
                .id(2L)
                .hoSo(commonHoSo)
                .tenTaiLieu("thong_thuong.pdf")
                .dinhDangFile("pdf")
                .build();
    }

    @Test
    void testTeacherBlockedFromDownloadingConfidentialDocument() throws Exception {
        VaiTro teacherRole = VaiTro.builder()
                .id("TEACHER")
                .tenVaiTro("Giáo viên")
                .build();
        TaiKhoan teacherAccount = TaiKhoan.builder()
                .username("giaovien")
                .vaiTro(teacherRole)
                .trangThai(true)
                .build();

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                teacherAccount, null, teacherAccount.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        when(service.getById(1L)).thenReturn(confidentialDoc);

        ResponseEntity<?> response = controller.downloadDocument(1L);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    @Test
    void testAdminCanDownloadConfidentialDocument() throws Exception {
        VaiTro adminRole = VaiTro.builder()
                .id("ADMIN")
                .tenVaiTro("Quản trị")
                .build();
        TaiKhoan adminAccount = TaiKhoan.builder()
                .username("admin")
                .vaiTro(adminRole)
                .trangThai(true)
                .build();

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                adminAccount, null, adminAccount.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        when(service.getById(1L)).thenReturn(confidentialDoc);
        when(service.downloadDocumentStream(1L)).thenReturn(new ByteArrayInputStream("test content".getBytes()));

        ResponseEntity<?> response = controller.downloadDocument(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testTeacherCanDownloadCommonDocument() throws Exception {
        VaiTro teacherRole = VaiTro.builder()
                .id("TEACHER")
                .tenVaiTro("Giáo viên")
                .build();
        TaiKhoan teacherAccount = TaiKhoan.builder()
                .username("giaovien")
                .vaiTro(teacherRole)
                .trangThai(true)
                .build();

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                teacherAccount, null, teacherAccount.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        when(service.getById(2L)).thenReturn(commonDoc);
        when(service.downloadDocumentStream(2L)).thenReturn(new ByteArrayInputStream("common content".getBytes()));

        ResponseEntity<?> response = controller.downloadDocument(2L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
