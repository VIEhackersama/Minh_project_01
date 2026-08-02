package com.school.records.modules.loans.job;

import com.school.records.modules.loans.service.MuonTraService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OverdueLoanJob {

    private static final Logger log = LoggerFactory.getLogger(OverdueLoanJob.class);

    @Autowired
    private MuonTraService muonTraService;

    // Runs every day at 01:00 AM (0 0 1 * * ?)
    @Scheduled(cron = "0 0 1 * * ?")
    public void scanOverdueLoans() {
        log.info("Bắt đầu tiến trình kiểm tra phiếu mượn quá hạn...");
        try {
            int updatedCount = muonTraService.checkAndMarkOverdueLoans();
            log.info("Hoàn tất quét phiếu mượn quá hạn. Đã cập nhật: {} phiếu.", updatedCount);
        } catch (Exception e) {
            log.error("Lỗi khi quét phiếu mượn quá hạn: ", e);
        }
    }
}
