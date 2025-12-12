"use client";
import React, { useState, useEffect, useCallback } from "react";
import classes from "./messages.module.css";
import type { Message } from "../../../types/message";
import type { Analytics } from "../../../types/analytics";
import Modal from "@/app/components/Modal/Modal";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [projectTag, setProjectTag] = useState("all");
  const [contactedFilter, setContactedFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.append("filter", filter);
      if (projectTag !== "all") params.append("projectTag", projectTag);
      if (contactedFilter !== "all")
        params.append("contacted", contactedFilter);

      const response = await fetch(`/api/admin/messages?${params}`);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, projectTag, contactedFilter]);

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/analytics");
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    fetchAnalytics();
  }, [fetchMessages, fetchAnalytics]);

  const updateMessage = async (
    messageId: string,
    updates: Partial<
      Pick<
        Message,
        "isRead" | "isArchived" | "isStarred" | "isContacted" | "projectTag"
      >
    >
  ) => {
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, updates }),
      });
      fetchMessages();
      if (selectedMessage?._id === messageId) {
        setSelectedMessage({ ...selectedMessage, ...updates });
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  };

  const exportToCSV = async () => {
    try {
      const response = await fetch("/api/admin/messages/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `messages-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      // Safety check before removing
      if (a.parentNode) {
        document.body.removeChild(a);
      }
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const projectTags = [
    "Web Development",
    "Mobile App",
    "E-commerce",
    "Portfolio",
    "Other",
  ];

  if (loading) {
    return <div className={classes.loading}>Loading messages...</div>;
  }

  return (
    <div className={classes.messagesPage}>
      <div className={classes.header}>
        <h1>Messages Dashboard</h1>
        <button onClick={exportToCSV} className={classes.exportButton}>
          Export to CSV
        </button>
      </div>

      {/* Analytics Section */}
      {analytics && (
        <div className={classes.analytics}>
          <div className={classes.analyticsCard}>
            <h3>Device Analytics</h3>
            <div className={classes.deviceStats}>
              <div>
                <span className={classes.statLabel}>Mobile:</span>
                <span className={classes.statValue}>
                  {analytics.deviceBreakdown.mobile}
                </span>
              </div>
              <div>
                <span className={classes.statLabel}>Desktop:</span>
                <span className={classes.statValue}>
                  {analytics.deviceBreakdown.desktop}
                </span>
              </div>
              <div>
                <span className={classes.statLabel}>Tablet:</span>
                <span className={classes.statValue}>
                  {analytics.deviceBreakdown.tablet}
                </span>
              </div>
            </div>
            <p className={classes.insight}>
              {analytics.deviceBreakdown.mobile >
              analytics.deviceBreakdown.desktop
                ? "Most inquiries come from mobile"
                : "Most inquiries come from desktop"}
            </p>
          </div>
          <div className={classes.analyticsCard}>
            <h3>Resume Downloads</h3>
            <p className={classes.statValue}>{analytics.resumeDownloads}</p>
          </div>
          <div className={classes.analyticsCard}>
            <h3>Total Messages</h3>
            <p className={classes.statValue}>{analytics.totalMessages}</p>
            <p className={classes.subStat}>{analytics.unreadCount} unread</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={classes.filters}>
        <div className={classes.filterGroup}>
          <label>Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={classes.select}
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="starred">Starred</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className={classes.filterGroup}>
          <label>Project Tag:</label>
          <select
            value={projectTag}
            onChange={(e) => setProjectTag(e.target.value)}
            className={classes.select}
          >
            <option value="all">All Tags</option>
            {projectTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.filterGroup}>
          <label>Contacted:</label>
          <select
            value={contactedFilter}
            onChange={(e) => setContactedFilter(e.target.value)}
            className={classes.select}
          >
            <option value="all">All</option>
            <option value="true">Contacted</option>
            <option value="false">Not Contacted</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className={classes.messagesContainer}>
        <div className={classes.messagesList}>
          {messages.length === 0 ? (
            <p className={classes.emptyState}>No messages found</p>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                className={`${classes.messageCard} ${
                  !message.isRead ? classes.unread : ""
                } ${message.isStarred ? classes.starred : ""}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className={classes.messageHeader}>
                  <div>
                    <h3>{message.name}</h3>
                    <p className={classes.email}>{message.email}</p>
                  </div>
                  <div className={classes.messageActions}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateMessage(message._id, {
                          isStarred: !message.isStarred,
                        });
                      }}
                      className={classes.iconButton}
                      title={message.isStarred ? "Unstar" : "Star"}
                    >
                      {message.isStarred ? "★" : "☆"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyEmail(message.email);
                      }}
                      className={classes.iconButton}
                      title="Copy Email"
                    >
                      📋
                    </button>
                  </div>
                </div>
                <p className={classes.messagePreview}>
                  {message.message.substring(0, 100)}
                  {message.message.length > 100 ? "..." : ""}
                </p>
                <div className={classes.messageMeta}>
                  <span className={classes.badge}>{message.deviceType}</span>
                  {message.projectTag && (
                    <span className={classes.tag}>{message.projectTag}</span>
                  )}
                  <span className={classes.date}>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={selectedMessage?.name}
        size="large"
      >
        {selectedMessage && (
          <div className={classes.messageDetail}>
            <div className={classes.detailContent}>
              <div className={classes.detailRow}>
                <strong>Email:</strong>
                <span>
                  {selectedMessage.email}
                  <button
                    onClick={() => copyEmail(selectedMessage.email)}
                    className={classes.copyButton}
                  >
                    Copy
                  </button>
                </span>
              </div>
              <div className={classes.detailRow}>
                <strong>Date:</strong>
                <span>
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </div>
              <div className={classes.detailRow}>
                <strong>Device:</strong>
                <span>{selectedMessage.deviceType}</span>
              </div>
              <div className={classes.detailRow}>
                <strong>Message:</strong>
                <p className={classes.messageText}>{selectedMessage.message}</p>
              </div>

              <div className={classes.detailActions}>
                <button
                  onClick={() =>
                    updateMessage(selectedMessage._id, {
                      isRead: !selectedMessage.isRead,
                    })
                  }
                  className={`${classes.actionButton} ${
                    selectedMessage.isRead ? classes.read : ""
                  }`}
                >
                  {selectedMessage.isRead ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button
                  onClick={() =>
                    updateMessage(selectedMessage._id, {
                      isArchived: !selectedMessage.isArchived,
                    })
                  }
                  className={`${classes.actionButton} ${
                    selectedMessage.isArchived ? classes.archived : ""
                  }`}
                >
                  {selectedMessage.isArchived ? "Unarchive" : "Archive"}
                </button>
                <button
                  onClick={() =>
                    updateMessage(selectedMessage._id, {
                      isStarred: !selectedMessage.isStarred,
                    })
                  }
                  className={`${classes.actionButton} ${
                    selectedMessage.isStarred ? classes.starred : ""
                  }`}
                >
                  {selectedMessage.isStarred ? "Unstar" : "Star"}
                </button>
                <button
                  onClick={() =>
                    updateMessage(selectedMessage._id, {
                      isContacted: !selectedMessage.isContacted,
                    })
                  }
                  className={`${classes.actionButton} ${
                    selectedMessage.isContacted ? classes.contacted : ""
                  }`}
                >
                  {selectedMessage.isContacted
                    ? "Mark as Not Contacted"
                    : "Mark as Contacted"}
                </button>
              </div>

              <div className={classes.tagSection}>
                <label>Project Tag:</label>
                <select
                  value={selectedMessage.projectTag || ""}
                  onChange={(e) =>
                    updateMessage(selectedMessage._id, {
                      projectTag: e.target.value || null,
                    })
                  }
                  className={classes.select}
                >
                  <option value="">None</option>
                  {projectTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
