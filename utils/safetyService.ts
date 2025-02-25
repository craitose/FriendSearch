interface Report {
  reporterId: string;
  reportedUserId: string;
  reason: string;
  details: string;
  timestamp: Date;
}

interface Block {
  blockerId: string;
  blockedUserId: string;
  timestamp: Date;
}

export class SafetyService {
  private static reports: Report[] = [];
  private static blocks: Block[] = [];

  static reportUser(
    reporterId: string,
    reportedUserId: string,
    reason: string,
    details: string
  ): void {
    const report: Report = {
      reporterId,
      reportedUserId,
      reason,
      details,
      timestamp: new Date(),
    };
    
    this.reports.push(report);
    // In a real app, this would be sent to a backend server
    console.log('User reported:', report);
  }

  static blockUser(blockerId: string, blockedUserId: string): void {
    const block: Block = {
      blockerId,
      blockedUserId,
      timestamp: new Date(),
    };
    
    this.blocks.push(block);
    // In a real app, this would be sent to a backend server
    console.log('User blocked:', block);
  }

  static isUserBlocked(userId: string, byUserId: string): boolean {
    return this.blocks.some(
      block =>
        block.blockerId === byUserId && block.blockedUserId === userId
    );
  }

  static getReportsByUser(reportedUserId: string): Report[] {
    return this.reports.filter(report => report.reportedUserId === reportedUserId);
  }
}