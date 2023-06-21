const statistics = require("@models/statistics");

class Dashboard {
    async index(req, res) {
        const data = {
            totalUsers: await statistics.totalUsers(),
            totalComments: await statistics.totalComments(),
            totalPosts: await statistics.totalPosts(),
            totalViews: await statistics.totalViews(),
        };
        res.adminRender("admin/dashboard/index", { ...data });
    }
}

module.exports = new Dashboard();
