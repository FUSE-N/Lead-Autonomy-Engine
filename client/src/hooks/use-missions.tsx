import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type Mission, type AgentLog } from "@shared/schema";

export function useMissions() {
    const startMission = useMutation({
        mutationFn: async (prompt: string) => {
            const res = await apiRequest("POST", "/api/missions", { prompt });
            return await res.json() as Mission;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/missions"] });
        }
    });

    const getMission = (id?: string) => useQuery<Mission>({
        queryKey: [`/api/missions/${id}`],
        enabled: !!id,
        refetchInterval: (data) => (data?.status === "running" ? 1000 : false),
    });

    const getLogs = (id?: string) => useQuery<AgentLog[]>({
        queryKey: [`/api/missions/${id}/logs`],
        enabled: !!id,
        refetchInterval: 1000,
    });

    return { startMission, getMission, getLogs };
}
