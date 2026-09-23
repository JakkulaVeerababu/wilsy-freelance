import {
  ArrowUpRight,
  Search,
  Bell,
  ArrowDownLeft,
  Plus,
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Settings,
  ChevronDown,
} from "lucide-react";

export function FormaPreview() {
  return (
    <div className="forma-preview">
      <div className="forma-nav">
        <span>
          forma<span className="forma-star">✳</span>
        </span>
        <div>Work &nbsp;&nbsp; Studio &nbsp;&nbsp; Contact ↗</div>
      </div>
      <div className="forma-hero">
        <span className="forma-kicker">ARCHITECTURE & INTERIORS</span>
        <h3>
          Spaces for
          <br />
          <em>better living.</em>
        </h3>
        <span className="forma-circle">
          <ArrowUpRight />
        </span>
      </div>
      <div className="forma-image">
        <div className="forma-image-caption">
          <span>THE COURTYARD HOUSE</span>
          <span>01 / 04</span>
        </div>
      </div>
      <div className="forma-bottom">
        <span>Considered spaces. Lasting impressions.</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </div>
  );
}

export function OrbitPreview() {
  return (
    <div className="orbit-preview">
      <aside className="orbit-sidebar">
        <div className="orbit-logo">◒ orbit</div>
        <span className="orbit-side-label">WORKSPACE</span>
        <span className="orbit-nav active">
          <LayoutDashboard /> Overview
        </span>
        <span className="orbit-nav">
          <ArrowLeftRight /> Transactions
        </span>
        <span className="orbit-nav">
          <CreditCard /> Cards
        </span>
        <span className="orbit-nav">
          <Settings /> Settings
        </span>
        <div className="orbit-person">
          <span>JD</span>
          <div>
            Jamie Davis<small>Personal account</small>
          </div>
        </div>
      </aside>
      <div className="orbit-main">
        <div className="orbit-top">
          <span>
            Workspace <ChevronDown size={12} />
          </span>
          <span>
            <Search size={14} />
            <Bell size={14} />
            <b>JD</b>
          </span>
        </div>
        <div className="orbit-heading">
          <div>
            <span>Your money, in focus.</span>
            <h3>
              Good morning, Jamie <span>✳</span>
            </h3>
          </div>
          <span className="orbit-add">
            <Plus size={12} /> Add money
          </span>
        </div>
        <div className="orbit-stats">
          <div>
            <span>Total balance</span>
            <strong>
              $24,680<span>.00</span>
            </strong>
            <small>All accounts · USD</small>
          </div>
          <div>
            <span>Money in</span>
            <strong>
              $8,450<span>.00</span>
            </strong>
            <small className="orbit-green">↗ This month</small>
          </div>
          <div>
            <span>Money out</span>
            <strong>
              $3,240<span>.00</span>
            </strong>
            <small>This month</small>
          </div>
        </div>
        <div className="orbit-chart">
          <div>
            <strong>Cash flow</strong>
            <span>This month⌄</span>
          </div>
          <div className="chart-bars">
            {[35, 52, 44, 72, 59, 87, 67, 78, 58, 92, 74, 100].map((v, i) => (
              <div key={i}>
                <i style={{ height: `${v}%` }} />
                <i style={{ height: `${v * 0.57}%` }} />
              </div>
            ))}
          </div>
          <div className="chart-months">
            <span>01 JUN</span>
            <span>10 JUN</span>
            <span>20 JUN</span>
            <span>30 JUN</span>
          </div>
        </div>
        <div className="orbit-transactions">
          <strong>Recent transactions</strong>
          <div>
            <span className="orbit-transaction-icon">
              <ArrowDownLeft size={14} />
            </span>
            <span>
              Client payment<small>Today, 09:41 AM</small>
            </span>
            <b>+$2,400.00</b>
          </div>
          <div>
            <span className="orbit-transaction-icon muted">
              <CreditCard size={14} />
            </span>
            <span>
              Workspace subscription<small>Yesterday</small>
            </span>
            <b>−$49.00</b>
          </div>
        </div>
      </div>
    </div>
  );
}
